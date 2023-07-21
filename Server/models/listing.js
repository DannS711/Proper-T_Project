'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      // define association here
      Listing.belongsTo(models.User, { foreignKey: 'UserId' });
      Listing.belongsTo(models.Type, { foreignKey: 'TypeId' });
    }
  }

  Listing.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title cannot be empty'
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'delayed',
      validate: {
        notEmpty: {
          msg: 'Status cannot be empty',
        },
        notNull: {
          msg: 'Status cannot be empty'
        }
      },
    },
    adType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Advertisement type cannot be empty',
        },
        notNull: {
          msg: 'Advertisement type cannot be empty'
        }
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address cannot be empty',
        },
        notNull: {
          msg: 'Address cannot be empty'
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',
        },
        notNull: {
          msg: 'Description cannot be empty'
        }
      },
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required',
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Price must be a positive number',
        },
      },
    },
    landArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Land area is required',
        },
        notEmpty: {
          msg: 'Land area is required'
        },
        min: {
          args: [0],
          msg: 'Land area must be a positive number',
        },
      },
    },
    buildingArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Building area is required',
        },
        notEmpty: {
          msg: 'Building area is required'
        },
        min: {
          args: [0],
          msg: 'Building area must be a positive number',
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID is required',
        },
        notEmpty: {
          msg: 'Ageny ID is required'
        },
      },
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type ID is required',
        },
        notEmpty: {
          msg: 'Type ID is required'
        },
      },
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image URL is required',
        },
        notEmpty: {
          msg: 'Image URL is required'
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Listing',
    hooks :{
      beforeCreate(listing) {
        listing.price = new Intl.NumberFormat("id-ID").format(listing.price)
      }
    }
  });
  return Listing;
};
