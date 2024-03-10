import { Sequelize }  from "sequelize"

export const sequelize = new Sequelize("ws", "root", "", {
	host: "localhost",
	dialect: "mysql",
})


