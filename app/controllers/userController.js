import { User, Employee } from "../models/index.js"
import jwt from "jsonwebtoken"

export async function loginUser(req, res) {
	const { login, password } = req.body

	try {
		const user = await User.findOne({
			where: {
				login,
				password,
			},
		})

		if (user) {
			const user_token = jwt.sign({ login }, "secret_key")
			res.status(200).send({ data: { user_token } })
		} else {
			res.status(401).send({
				error: { code: 401, message: "Authentication failed" },
			})
		}
	} catch (error) {
		console.error("Error executing query: ", error)
		res.status(500).send({
			error: { code: 500, message: "Internal Server Error" },
		})
	}
}

export async function createUser(req, res) {
	const { name, surname, patronymic, login, password, role_id } = req.body

	if (!name || !login || !password || !role_id) {
		return res.status(400).send({ error: { code: 400, message: "Missing required fields" } })
	}

	let photoPath = null
	if (req.file) {
		const photoName = req.file.filename
		photoPath = `photos/${photoName}`
	}

	try {
		const employee = await Employee.create({
			name,
			surname,
			patronymic,
			login,
			password,
			photo_path: photoPath,
			role_id,
		})
		res.status(201).send({ data: { id: employee.id, status: "created" } })
	} catch (error) {
		console.error("Error executing query: ", error)
		res.status(500).send({
			error: { code: 500, message: "Internal Server Error" },
		})
	}
}

export async function getUsers(req, res) {
	try {
		const employees = await Employee.findAll({
			attributes: ["id", "name", "login", "status", "groups"],
		})

		const responseData = employees.map(employee => ({
			id: employee.id,
			name: employee.name,
			login: employee.login,
			status: employee.status,
			group: employee.groups,
		}))

		console.log("responseData", responseData)

		res.status(200).send({ data: responseData })
	} catch (error) {
		console.error("Error fetching employees: ", error)
		res.status(500).send({
			error: { code: 500, message: "Internal Server Error" },
		})
	}
}
