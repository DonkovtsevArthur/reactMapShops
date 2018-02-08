import * as Boom from 'boom';
import * as Logger from 'pino';
import * as uuid from 'uuid';
import { HemeraClient, HemeraPath } from '../../interfaces/core';

const logger = Logger();

export async function share(payload, response, model, hemera) {
  try {
    const { orgId, apps } = payload;
    const accessToken =  uuid.v4();
    const share = await model.create({
      accessToken,
      parent: orgId,
    });
    await Promise.all(apps.map(async (app) => {
      const path: HemeraPath = { topic: 'userApp', cmd: 'verify' };
      const verify = new HemeraClient(hemera, path, { orgId, appId: app.appId });
      const resultVerify = await verify.act();
      if (!resultVerify) {
        return Promise.reject('Access denide');
      }
      return model.update(
        {
          _id: share._id,
        },
        {
          $push : {
            apps: {
              appId: app.appId,
              appType: app.appType,
            },
          },
        });
    }));
    response(null, share);
  } catch (error) {
    response(Boom.locked());
    logger.error(error);
  }
}

export async function closeShare(payload, response, model, hemera) {
  try {
    const { accessToken, orgId } = payload;
    await model.findOneAndUpdate(
      {
        $and: [
          { accessToken },
          { parent: orgId },
        ],
      },
      {
        $set: {
          active: false,
        },
      }
    );
    const path: HemeraPath = { topic: 'userApp', cmd: 'setStatusByAccessToken' };
    const close = new HemeraClient(hemera, path, { accessToken, status: 'inactive' });
    await close.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function openShare(payload, response, model, hemera) {
  try {
    const { accessToken, orgId } = payload;
    await model.findOneAndUpdate(
      {
        $and: [
          { accessToken },
          { parent: orgId },
        ],
      },
      {
        $set: {
          active: true,
        },
      }
    );
    const path: HemeraPath = { topic: 'userApp', cmd: 'setStatusByAccessToken' };
    const open = new HemeraClient(hemera, path, { accessToken, status: 'active' });
    await open.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function removeShare(payload, response, model, hemera) {
  try {
    const { accessToken, orgId } = payload;
    await model.remove(
      {
        $and: [
          { accessToken },
          { parent: orgId },
        ],
      }
    );
    const path: HemeraPath = { topic: 'userApp', cmd: 'removeByAccessToken' };
    const remove = new HemeraClient(hemera, path, { accessToken });
    await remove.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getShareToApp(payload, response, model) {
  try {
    const { appId, orgId } = payload;
    const share = await model.find(
      {
        $and: [
          { 'apps.appId': appId },
          { parent: orgId },
        ],
      }
    );
    response(null, share);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getShareToToken(payload, response, model) {
  try {
    const share = await model.findOne(payload);
    response(null, share);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getParent(payload, response, model) {
  try {
    const { accessToken } = payload;
    const share = await model.findOne({ accessToken });
    response(null, share.parent);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function copy(payload, response, model, hemera) {
  try {
    const { accessToken, orgId, alias, group } = payload;
    const share = await model.findOne({ accessToken }).select({
      active: 1,
      apps: 1,
    });
    if (!share || !share.active) {
      response(Boom.resourceGone());
      return;
    }
    const path: HemeraPath = { topic: 'preset', cmd: 'copyApps' };
    const copy = new HemeraClient(hemera, path, {
      alias,
      group,
      orgId,
      accessToken,
      apps: share.apps,
    });
    const copyVerify = await copy.act();

    response(null, copyVerify);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
