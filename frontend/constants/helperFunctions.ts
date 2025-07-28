import { Task } from '@/interfaces/interfaces';

// Helper function to add leading 0 to number (up to 2 digits)
function padWithZero(num: number): string {
  return num.toString().padStart(2, '0');
}

// Helper function to convert seconds to [hours, minutes, seconds]
function formatTime(seconds: number): number[] {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h, m, s];
}

function formatTimeAsSentence(seconds: number) {
  const resultSentence: string[] = [];
  const [h, m, s] = formatTime(seconds);

  if (h > 0) {
    resultSentence.push(`${h} hour${h > 1 ? 's' : ''}`);
  }
  if (m > 0) {
    resultSentence.push(`${m} minute${m > 1 ? 's' : ''}`);
  }
  if (s > 0 || resultSentence.length === 0) {
    // Always show seconds if hours and minutes are zero
    resultSentence.push(`${s} second${s > 1 ? 's' : ''}`);
  }

  // Join the parts with spaces and 'and'
  if (resultSentence.length === 3) {
    return `${resultSentence[0]}, ${resultSentence[1]}, and ${resultSentence[2]}`;
  } else if (resultSentence.length === 2) {
    return `${resultSentence[0]} and ${resultSentence[1]}`;
  } else if (resultSentence.length === 1) {
    return resultSentence[0];
  } else {
    return '0 seconds';
  }
}

function formatTimeAsShort(seconds: number) {
  const resultSentence: string[] = [];
  const [h, m, s] = formatTime(seconds);

  if (h > 0) {
    resultSentence.push(`${h}h`);
  }
  if (m > 0) {
    resultSentence.push(`${m}min`);
  }
  if (s > 0 || resultSentence.length === 0) {
    // Always show seconds if hours and minutes are zero
    resultSentence.push(`${s}s`);
  }

  // Join the parts with spaces and 'and'
  if (resultSentence.length === 3) {
    return `${resultSentence[0]} ${resultSentence[1]} ${resultSentence[2]}`;
  } else if (resultSentence.length === 2) {
    return `${resultSentence[0]} ${resultSentence[1]}`;
  } else if (resultSentence.length === 1) {
    return resultSentence[0];
  } else {
    return '0s';
  }
}

function importanceStars(importance: 'low' | 'medium' | 'high') {
  if (importance === 'low') {
    return '★';
  } else if (importance === 'medium') {
    return '★★';
  } else if (importance === 'high') {
    return '★★★';
  }
}

function getImportanceRank(importance: 'low' | 'medium' | 'high'): number {
  switch (importance) {
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 0;
  }
}

const isTaskDeadlineClose = (
  task: Task,
  currentTime: Date = new Date(),
  bufferHours: number = 0
): boolean => {
  if (task.completed) {
    return false;
  } else if (!task.deadline) {
    return false;
  }

  const deadlineTime = task.deadline.toDate().getTime();
  const estimatedCompletionTime =
    currentTime.getTime() + task.estimatedDurationMinutes * 60 * 1000;
  const bufferTime = bufferHours * 60 * 60 * 1000;

  return estimatedCompletionTime + bufferTime >= deadlineTime;
};

const helperFunctions = {
  padWithZero,
  formatTime,
  formatTimeAsSentence,
  formatTimeAsShort,
  importanceStars,
  getImportanceRank,
  isTaskDeadlineClose,
};

export default helperFunctions;
