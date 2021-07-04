import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ensureAdmin } from "./middlewares/ensureAdmin"

import { ListAllUsersController } from "./controllers/ListAllUsersController";
import { ListUserByIDController } from "./controllers/ListUserByIDController";
import { CreateUserController } from "./controllers/CreateUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";

import { ListAllTagsController } from "./controllers/ListAllTagsController";
import { ListTagByIDController } from "./controllers/ListTagByIDController";
import { CreateTagController } from "./controllers/CreateTagController";
import { UpdateTagController } from "./controllers/UpdateTagController";
import { DeleteTagController } from "./controllers/DeleteTagController";

import { ListAllComplimentsController } from "./controllers/ListAllComplimentsController";
import { ListComplimentByIDController } from "./controllers/ListComplimentByIDController";
import { ListComplimentsByUserSenderController } from "./controllers/ListComplimentsByUserSenderController";
import { ListComplimentsByUserReceiverController } from "./controllers/ListComplimentsByUserReceiverController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { UpdateComplimentController } from "./controllers/UpdateComplimentController";
import { DeleteComplimentController } from "./controllers/DeleteComplimentController";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

const listAllUsersController = new ListAllUsersController();
const listUserByIDController = new ListUserByIDController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const listAllTagsController = new ListAllTagsController();
const listTagByIDController = new ListTagByIDController();
const createTagController = new CreateTagController();
const updateTagController = new UpdateTagController();
const deleteTagController = new DeleteTagController();

const listAllComplimentsController = new ListAllComplimentsController();
const listComplimentByIDController = new ListComplimentByIDController();
const listComplimentsByUserSenderController = new ListComplimentsByUserSenderController();
const listComplimentsByUserReceiverController = new ListComplimentsByUserReceiverController();
const createComplimentController = new CreateComplimentController();
const updateComplimentController = new UpdateComplimentController();
const deleteComplimentController = new DeleteComplimentController();

const authenticateUserController = new AuthenticateUserController();

router.get("/users", ensureAuthenticated, listAllUsersController.handle);
router.get("/users/:id", ensureAuthenticated, listUserByIDController.handle);
router.post("/users", createUserController.handle);
router.put("/users/:id", ensureAuthenticated, ensureAdmin, updateUserController.handle);
router.delete("/users/:id", ensureAuthenticated, ensureAdmin, deleteUserController.handle);

router.get("/tags", ensureAuthenticated, listAllTagsController.handle);
router.get("/tags/:id", ensureAuthenticated, listTagByIDController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.put("/tags/:id", ensureAuthenticated, ensureAdmin, updateTagController.handle);
router.delete("/tags/:id", ensureAuthenticated, ensureAdmin, deleteTagController.handle);

router.get("/compliments", ensureAuthenticated, listAllComplimentsController.handle);
router.get("/compliments/:id", ensureAuthenticated, listComplimentByIDController.handle);
router.get("/users/:user_sender/sentcompliments", ensureAuthenticated, listComplimentsByUserSenderController.handle);
router.get("/users/:user_received/receivedcompliments", ensureAuthenticated, listComplimentsByUserReceiverController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.put("/compliments/:id", ensureAuthenticated, ensureAdmin, updateComplimentController.handle);
router.delete("/compliments/:id", ensureAuthenticated, ensureAdmin, deleteComplimentController.handle);

router.post("/login", authenticateUserController.handle);

export { router }