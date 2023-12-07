import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const specialSchedule = sequelize.define(
    'specialSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      scheduleDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('scheduleDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('scheduleDate'))
                .format('YYYY-MM-DD')
            : null;
        },
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

  specialSchedule.associate = (models) => {
    models.specialSchedule.belongsToMany(models.musicTrack, {
      as: 'musicTrack',
      constraints: false,
      through: 'specialScheduleMusicTrackMusicTrack',
    });


    
    models.specialSchedule.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.specialSchedule.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.specialSchedule.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return specialSchedule;
}
