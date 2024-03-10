import Fastify from "fastify"
import { createUser, getUsers, loginUser } from "./controllers/userController.js"
import { closeWorkShift, createWorkShift, openWorkShift, setUserWorkShift } from "./controllers/workShiftController.js"

const fastify = Fastify()

fastify.post("/api-tort/login", loginUser)
fastify.post("/api-tort/user", { preHandler: fastify.multipart }, createUser)
fastify.get("/api-tort/users", getUsers)

fastify.post("/api-tort/work-shift", createWorkShift)
fastify.get("/api-tort/work-shift/:id/open", openWorkShift)
fastify.get("/api-tort/work-shift/:id/close", closeWorkShift)
fastify.post("/api-tort/work-shift/:id/user", setUserWorkShift)

const start = async () => {
	try {
		await fastify.listen(3000)
		fastify.log.info(`Сервер запущен на ${fastify.server.address().port}`)
	} catch (err) {
		fastify.log.error(err)
	}
}

start()
