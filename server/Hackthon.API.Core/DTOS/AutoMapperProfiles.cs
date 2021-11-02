using AutoMapper;
using Hackthon.API.Core.DTOS;
using Hackthon.Domain;

namespace Hackthon.API.Core
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDTO>();
        }
    }
}