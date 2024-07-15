const { Router } = require("express");
const { get, post, put, remove } = require("../controllers/todo.controller");

const router = Router();

router.get("/", get);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", remove);

module.exports = router;
