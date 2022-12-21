// ~~ ENV
const dotenv = require('dotenv');
//
const path = require('path');
const webpack = require('webpack');
// ~~ RULES
const loadShadersRule = require('./rules/loadShaders.js');
const loadWebWorkersRule = require('./rules/loadWebWorkers.js');
const transpileJavaScriptRule = require('./rules/transpileJavaScript.js');
// ~~ PLUGINS
const TerserJSPlugin = require('terser-webpack-plugin');