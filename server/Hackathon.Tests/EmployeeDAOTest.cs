using Hackthon.Domain;
using Hackthon.SQLServer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Hackathon.Tests
{
    [TestClass]
    public class EmployeeDAOTest
    {
        private EmployeeDAO _employeeDao;
        private Employee _employee;

        [TestInitialize]
        public void Initialize()
        {
            _employeeDao = new EmployeeDAO();

            EmployeeBuilder();
            _employeeDao.AddOrUpdate(_employee);
        }

        [TestMethod]
        public void AddEmployeeTest()
        {
            EmployeeBuilder();

            _employeeDao.AddOrUpdate(_employee);

            Assert.IsTrue(_employee.Id > 0);
        }

        [TestMethod]
        public void UpdateEmployeeTest()
        {
            int idEmployee = 1;

            var employeeUptdate = new Employee();
            employeeUptdate = _employeeDao.GetById(idEmployee);

            _employee.Name = "Alberto Leal Edit"; ;
            _employeeDao.AddOrUpdate(employeeUptdate);

            var employeeUptdated = new Employee();
            employeeUptdated = _employeeDao.GetById(idEmployee);

            Assert.AreEqual(employeeUptdate.Name, employeeUptdated.Name);
        }

        [TestMethod]
        public void GetEmployeeByIdTest()
        {
            int findId = 1;
            EmployeeBuilder();
            _employeeDao.AddOrUpdate(_employee);

            var employeeFinded = _employeeDao.GetById(findId);

            Assert.IsNotNull(employeeFinded);
        }

        [TestMethod]
        public void GetAllEmployeesTest()
        {
            int numberEmployees = 3;

            for (int i = 0; i < 2; i++)
            {
                EmployeeBuilder();
                _employeeDao.AddOrUpdate(_employee);
            }

            var listEmployees = _employeeDao.GetAll();

            Assert.AreEqual(numberEmployees, listEmployees.Count);
        }

        [TestMethod]
        public void GetEmployeeByTextTest()
        {
            int numberEmployees = 3;

            for (int i = 0; i < 2; i++)
            {
                EmployeeBuilder();
                _employeeDao.AddOrUpdate(_employee);
            }

            string findText = "Alberto";

            var listEmployees = _employeeDao.GetByText(findText);

            Assert.AreEqual(numberEmployees, listEmployees.Count);
        }

        [TestMethod]
        public void DeleteEmployeeTest()
        {
            int numberEmployees = 1;
            int idDeleted = 1;
            EmployeeBuilder();
            _employeeDao.AddOrUpdate(_employee);

            _employeeDao.Delete(idDeleted);

            var listEmployees = _employeeDao.GetAll();

            Assert.AreEqual(numberEmployees, listEmployees.Count);
        }

        [TestMethod]
        public void ValidateCPFTest()
        {
            EmployeeBuilder();

            var isValid = Validator.IsCpf(_employee.CPF);

            Assert.IsTrue(isValid);
        }

        [TestCleanup]
        public void CleanDataBase()
        {
            _employeeDao.ClearDataBase();
        }

        private void EmployeeBuilder()
        {
            _employee = new Employee();

            _employee.Id = 0;
            _employee.Name = "Alberto Leal Castro";
            _employee.CPF = "380.076.590-05";
            _employee.Birth = DateTime.Now.AddYears(-18);
            _employee.Phone = "(49)9 99929780";
        }
    }
}