import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const musicTrack = sequelize.define(
    'musicTrack',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      trackName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      artist: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      album: {
        type: DataTypes.STRING(100),
        validate: {
          len: [2, 100],
        }
      },
      externalSourceUrl: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  musicTrack.associate = (models) => {


    models.musicTrack.hasMany(models.file, {
      as: 'cover',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.musicTrack.getTableName(),
        belongsToColumn: 'cover',
      },
    });

    models.musicTrack.hasMany(models.file, {
      as: 'audioTrack',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.musicTrack.getTableName(),
        belongsToColumn: 'audioTrack',
      },
    });
    
    models.musicTrack.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.musicTrack.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.musicTrack.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return musicTrack;
}
