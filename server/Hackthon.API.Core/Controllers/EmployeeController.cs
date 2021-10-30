using Hackthon.Domain;
using Hackthon.SQLServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Hackthon.API.Core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private ILogger<EmployeeController> _logger;
        public EmployeeDAO _employeeDAO;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
            _employeeDAO = new EmployeeDAO();
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _employeeDAO.GetAll().ToArray();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            if (employee == null) return NotFound();
            _employeeDAO.AddOrUpdate(employee);

            return Ok(employee);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            if (employee == null) return NotFound();
            _employeeDAO.AddOrUpdate(employee);

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _employeeDAO.Delete((int)id);
            return NoContent();
        }
    }
}