import { DataTypes } from "sequelize"
import { sequelize } from "../config/dbConfig.js"

export const User = sequelize.define(
	"User",
	{
		login: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	},
)

export const Employee = sequelize.define(
	"Employee",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		patronymic: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		photo_path: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		groups: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	},
)

export const WorkShift = sequelize.define(
	"WorkShift",
	{
		start: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		tableName: "work_shifts",
		timestamps: true,
	},
)
