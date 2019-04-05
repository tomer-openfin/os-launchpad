export const toggleFinNotificationCenter = async () => {
  const { fin } = window;
  if (!fin) {
    return;
  }

  const plugin = await fin.InterApplicationBus.Channel.connect('of-notifications-service-v1', { payload: { version: '0.9.5' } });
  const result = await plugin.dispatch('toggle-notification-center');
  return result;
};
