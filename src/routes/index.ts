import comments from './comments';

export = (app: any) => {
  app.use('/orgs', comments);
};
