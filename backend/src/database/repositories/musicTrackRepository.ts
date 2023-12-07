import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';
import RegularScheduleRepository from './regularScheduleRepository';
import SpecialScheduleRepository from './specialScheduleRepository';

const Op = Sequelize.Op;

class MusicTrackRepository {

  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await options.database.musicTrack.create(
      {
        ...lodash.pick(data, [
          'trackName',
          'artist',
          'album',
          'externalSourceUrl',
          'active',          
          'importHash',
        ]),

        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    
  
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.musicTrack.getTableName(),
        belongsToColumn: 'cover',
        belongsToId: record.id,
      },
      data.cover,
      options,
    );
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.musicTrack.getTableName(),
        belongsToColumn: 'audioTrack',
        belongsToId: record.id,
      },
      data.audioTrack,
      options,
    );
  
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );


    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.musicTrack.findOne(      
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        ...lodash.pick(data, [
          'trackName',
          'artist',
          'album',
          'externalSourceUrl',
          'active',          
          'importHash',
        ]),

        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );



    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.musicTrack.getTableName(),
        belongsToColumn: 'cover',
        belongsToId: record.id,
      },
      data.cover,
      options,
    );
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.musicTrack.getTableName(),
        belongsToColumn: 'audioTrack',
        belongsToId: record.id,
      },
      data.audioTrack,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.musicTrack.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [

    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.musicTrack.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const where = {
      id: {
        [Op.in]: ids,
      },
      tenantId: currentTenant.id,
    };

    const records = await options.database.musicTrack.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.musicTrack.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  static async fetchRadioList(options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let regularSchedules = await RegularScheduleRepository.getRadioSchedule(options);
    let specialSchedule = await SpecialScheduleRepository.getRadioSchedule(options);
    
    let rMusicTracks= [];
    let sMusicTracks= [];
    let combinedMusicTracks = [];
    if (regularSchedules.length>0) rMusicTracks = regularSchedules[0].musicTrack;

    if (specialSchedule.length>0) 
    {  
      sMusicTracks = specialSchedule[0].musicTrack;       
       
      let rows  = await this._fillWithRelationsAndFilesForRows(
        sMusicTracks.concat(rMusicTracks),
        options,
      );
      return rows;

       //return sMusicTracks.concat(rMusicTracks);
    }
    else if (rMusicTracks.length > 0)
    {
      
      let rows  = await this._fillWithRelationsAndFilesForRows(
        rMusicTracks,
        options,
      );
       return rows;
    }
    else 
    {       
      const records = await options.database.musicTrack.findAll();
  
      let rows  = await this._fillWithRelationsAndFilesForRows(
        records,
        options,
      );

      return rows
    }
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.trackName) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'musicTrack',
            'trackName',
            filter.trackName,
          ),
        );
      }

      if (filter.artist) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'musicTrack',
            'artist',
            filter.artist,
          ),
        );
      }

      if (filter.album) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'musicTrack',
            'album',
            filter.album,
          ),
        );
      }

      if (filter.externalSourceUrl) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'musicTrack',
            'externalSourceUrl',
            filter.externalSourceUrl,
          ),
        );
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        whereAnd.push({
          active:
            filter.active === true ||
            filter.active === 'true',
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.musicTrack.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'musicTrack',
              'trackName',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.musicTrack.findAll(
      {
        attributes: ['id', 'trackName'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['trackName', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.trackName,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        cover: data.cover,
        audioTrack: data.audioTrack,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'musicTrack',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.cover = await FileRepository.fillDownloadUrl(
      await record.getCover({
        transaction,
      }),
    );

    output.audioTrack = await FileRepository.fillDownloadUrl(
      await record.getAudioTrack({
        transaction,
      }),
    );

    return output;
  }
}

export default MusicTrackRepository;
