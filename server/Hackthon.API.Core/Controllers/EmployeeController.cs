using AutoMapper;
using Hackthon.API.Core.DTOS;
using Hackthon.Domain;
using Hackthon.SQLServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hackthon.API.Core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private ILogger<EmployeeController> _logger;
        public EmployeeDAO _employeeDAO;

        public IMapper _mapper;

        public EmployeeController(ILogger<EmployeeController> logger, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _employeeDAO = new EmployeeDAO();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = _employeeDAO.GetAll().ToArray();

            var results = _mapper.Map<IEnumerable<EmployeeDTO>>(employees);

            return Ok(results);
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