export function generateConversationId(id1: string, id2: string): string {
    if (id1 === '3') {
      return `3-${id2}`;
    } else if (id2 === '3') {
      return `3-${id1}`;
    } else {
      const sortedIds = [id1, id2].sort();
      return `${sortedIds[0]}-${sortedIds[1]}`;
    }
  }
  