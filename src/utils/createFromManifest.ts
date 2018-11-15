export default (manifestUrl: string) => {
  const { fin } = window;

  if (!fin) {
    return;
  }

  fin.desktop.Application.createFromManifest(
    manifestUrl,
    (createdApp: fin.OpenFinApplication): void => {
      createdApp.run(
        (): void => {
          /* tslint:disable-next-line:no-console */
          console.info('Launched Successfully: ', createdApp);
        },
        (): void => {
          /* tslint:disable-next-line:no-console */
          console.info('Launch Error: ', createdApp);
        },
      );
    },
  );
};
