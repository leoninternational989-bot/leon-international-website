'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase-browser';

export type UserRole = 'super_admin' | 'admin' | 'sales' | 'support';

export interface CrmUser {
  id: string;
  full_name: string;
  role: UserRole;
  email_alias_id: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  email?: string; // from auth.users
  alias_email?: string; // joined from email_aliases
}

interface UserContextType {
  user: CrmUser | null;
  loading: boolean;
  isSuperAdmin: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  isSuperAdmin: false,
  refresh: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CrmUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('crm_users')
      .select('*, email_aliases(alias_email)')
      .eq('id', authUser.id)
      .single();

    if (data) {
      setUser({
        ...data,
        email: authUser.email,
        alias_email: data.email_aliases?.alias_email ?? null,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isSuperAdmin: user?.role === 'super_admin',
        refresh: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
