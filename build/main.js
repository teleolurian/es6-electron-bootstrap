const url         = require('url')
const path        = require('path')
const _           = require('lodash')
const Electron    = require('electron')

class CoreApp {
  __initAppHooks(){
    this.app.on('ready', this.createWindow.bind(this))
    this.app.on('window-all-closed', this.onAllWindowsClosed.bind(this))
    this.app.on('activate', this.onActivate.bind(this))
  }

  constructor(width, height){
    this.app = Electron.app
    this.root = __dirname
    this.width = width
    this.height = height
    this.__initAppHooks()
  }

  createWindow() {
    this.window = new Electron.BrowserWindow(_.pick(this, 'width', 'height'))
    this.loadTemplate('index')
    this.window.webContents.openDevTools()
    this.window.on('closed', this.closeWindow.bind(this))
  }

  closeWindow() { this.window = null }

  loadTemplate(template_name){
    if (!(/\.html?$/.test(template_name))) template_name += '.html'
    this.window.loadURL(url.format({
      pathname: path.join(this.root, 'templates', template_name),
      protocol: 'file:',
      slashes: true
    }))
  }

  onActivate() {
    if (win === null) this.createWindow()
  }

  onAllWindowsClosed() {
    this.app.quit()
  }
}


module.exports.CoreApp = CoreApp
module.exports.app = new CoreApp()
