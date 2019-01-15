export const enum TaskStatus {
  FREE = 'FREE',
  STARTED = 'STARTED',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export interface ITask {
  id?: number;
  title?: string;
  owner?: string;
  reward?: number;
  status?: TaskStatus;
  assignee?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
}

export const defaultValue: Readonly<ITask> = {};
