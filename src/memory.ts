import { JSONFilePreset } from 'lowdb/node';
import type { AIMessage } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

type HistoryData = {
  messages: MessageWithMetadata[];
};

const defaultHistoryData: HistoryData = {
  messages: [],
};

const getDb = async () => await JSONFilePreset<HistoryData>(
  'db.json',
  defaultHistoryData,
)

const addMetadata = (message: AIMessage): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: Date.now(),
});

export const addMessage = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))

  await db.write()
}
