import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated"
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin"

import { ListAllUsersController } from "@modules/users/useCases/ListAllUsers/ListAllUsersController";
import { ListUserByIDController } from "@modules/users/useCases/ListUserByID/ListUserByIDController";
import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";
import { UpdateUserController } from "@modules/users/useCases/UpdateUser/UpdateUserController";
import { DeleteUserController } from "@modules/users/useCases/DeleteUser/DeleteUserController";

import { ListAllTagsController } from "@modules/tags/useCases/ListAllTags/ListAllTagsController";
import { ListTagByIDController } from "@modules/tags/useCases/ListTagByID/ListTagByIDController";
import { CreateTagController } from "@modules/tags/useCases/CreateTag/CreateTagController";
import { UpdateTagController } from "@modules/tags/useCases/UpdateTag/UpdateTagController";
import { DeleteTagController } from "@modules/tags/useCases/DeleteTag/DeleteTagController";

import { ListAllComplimentsController } from "@modules/compliments/useCases/ListAllCompliments/ListAllComplimentsController";
import { ListComplimentByIDController } from "@modules/compliments/useCases/ListComplimentByID/ListComplimentByIDController";
import { ListComplimentsByUserSenderController } from "@modules/compliments/useCases/ListComplimentsByUserSender/ListComplimentsByUserSenderController";
import { ListComplimentsByUserReceiverController } from "@modules/compliments/useCases/ListComplimentsByUserReceiver/ListComplimentsByUserReceiverController";
import { CreateComplimentController } from "@modules/compliments/useCases/CreateCompliment/CreateComplimentController";
import { UpdateComplimentController } from "@modules/compliments/useCases/UpdateCompliment/UpdateComplimentController";
import { DeleteComplimentController } from "@modules/compliments/useCases/DeleteCompliment/DeleteComplimentController";

import { AuthenticateUserController } from "@modules/users/useCases/AuthenticateUser/AuthenticateUserController";

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
router.get("/users/:user_receiver/receivedcompliments", ensureAuthenticated, listComplimentsByUserReceiverController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.put("/compliments/:id", ensureAuthenticated, ensureAdmin, updateComplimentController.handle);
router.delete("/compliments/:id", ensureAuthenticated, ensureAdmin, deleteComplimentController.handle);

router.post("/login", authenticateUserController.handle);

export { router }