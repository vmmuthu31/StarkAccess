const express = require("express");
const Event = require("../models/Event");
const authenticateToken = require("../middleware/authenticateToken");
const { default: axios } = require("axios");
const { URL } = require("../constants");
const router = express.Router();