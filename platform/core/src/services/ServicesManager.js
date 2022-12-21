import log from '../log'

export default class ServicesManager {
  constructor() {
    this.services = {}
    this.registeredServiceNames = []
  }
  // 注册一个新服务
  registerService(service, configuration = {}) {
    // 传参校验
    if (!service) {
      log.warn(
        'Attempting to register a null/undefined service. Exiting early.'
      );
      return;
    }

    if (!service.name) {
      log.warn(`Service name not set. Exiting early.`);
      return;
    }

    if (this.registeredServiceNames.includes(service.name)) {
      log.warn(
        `Service name ${service.name} has already been registered. Exiting before duplicating services.`
      );
      return;
    }

    if (service.create) {
      this.services[service.name] = service.create({
        configuration,
      });
    } else {
      log.warn(`Service create factory function not defined. Exiting early.`);
      return;
    }
    // 记录已注册的服务名称
    this.registeredServiceNames.push(service.name)
  }
  // 注册多个
  registerServices(services) {
    services.forEach(service => {
      const hasConfiguration = Array.isArray(service)
 
      if(hasConfiguration) {
        const [ohifService, configuration] = service
        this.registerService(ohifService, configuration)
      }else {
        this.registerService(service)
      }
    })
  }
}