import { DROP_ALLOWED } from './DragWrapper';

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes(DROP_ALLOWED)) {
    e.dataTransfer.effectAllowed = 'all';
    e.dataTransfer.dropEffect = 'copy';
  }
};

export const createChannelsHandleDrop = (handleDrop: (uuid: string, name: string, channelId: string) => void) => (e: React.DragEvent<HTMLDivElement>) => {
  if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes(DROP_ALLOWED)) {
    const channelId = e.dataTransfer.getData('channelid');
    const uuid = e.dataTransfer.getData('uuid');
    const name = e.dataTransfer.getData('name');

    handleDrop(uuid, name, channelId);
  }
};
