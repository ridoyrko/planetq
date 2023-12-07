import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const regularSchedule = sequelize.define(
    'regularSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      day: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ]],
        }
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
        {
          unique: true,
          fields: ['day', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  regularSchedule.associate = (models) => {
    models.regularSchedule.belongsToMany(models.musicTrack, {
      as: 'musicTrack',
      constraints: false,
      through: 'regularScheduleMusicTrackMusicTrack',
    });


    
    models.regularSchedule.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.regularSchedule.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.regularSchedule.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return regularSchedule;
}
