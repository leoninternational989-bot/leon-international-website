import { gmail } from './gmail';

export async function registerGmailWatch(): Promise<{
  historyId: string;
  expiration: string;
}> {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID is not set');
  }

  const res = await gmail.users.watch({
    userId: 'me',
    requestBody: {
      topicName: `projects/${projectId}/topics/gmail-push`,
      labelIds: ['INBOX'],
    },
  });

  return {
    historyId: res.data.historyId || '',
    expiration: res.data.expiration || '',
  };
}
