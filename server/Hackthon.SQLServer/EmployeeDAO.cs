using Hackthon.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Hackthon.SQLServer
{
    public class EmployeeDAO : IDAO<Employee>
    {
        public const string _connectionString = @"Server=tcp:sartor-server.database.windows.net,1433;Initial Catalog=HackathonDB;Persist Security Info=False;User ID=sartor;Password='@H4ck4th0n@';MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        public void AddOrUpdate(Employee employee)
        {
            if (employee.Id == 0)
            {
                try
                {
                    AddEmployee(employee);
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            else
            {
                try
                {
                    UpdateEmployee(employee);
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        private static void UpdateEmployee(Employee employee)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;

                    string sql = @"UPDATE [TBEmployee]
                                                   SET [Name] = @Name
                                                      ,[Cpf] = @Cpf
                                                      ,[Birth] = @Birth
                                                      ,[Phone] = @Phone
                                                 WHERE Id_Employee = @Id_Employee";

                    command.Parameters.AddWithValue("@Id_Employee", employee.Id);
                    command.Parameters.AddWithValue("@Name", employee.Name);
                    command.Parameters.AddWithValue("@Cpf", employee.CPF);
                    command.Parameters.AddWithValue("@Birth", employee.Birth);
                    command.Parameters.AddWithValue("@Phone", employee.Phone);

                    command.CommandText = sql;

                    command.ExecuteNonQuery();
                }
            }
        }

        private void AddEmployee(Employee employee)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;

                    string sqlInsert = @"INSERT INTO TBEmployee (Name, Cpf, Birth, Phone)
                                            VALUES (@Name, @Cpf, @Birth, @Phone);SELECT SCOPE_IDENTITY();";

                    command.Parameters.AddWithValue("@Name", employee.Name);
                    command.Parameters.AddWithValue("@Cpf", employee.CPF);
                    command.Parameters.AddWithValue("@Birth", employee.Birth);
                    command.Parameters.AddWithValue("@Phone", employee.Phone);

                    command.CommandText = sqlInsert;

                    employee.Id = command.ExecuteNonQuery();
                }
            }
        }

        public int Delete(int id)
        {
            int count = 0;

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand())
                    {
                        command.Connection = connection;

                        string sql = @"DELETE FROM TBEmployee WHERE Id_Employee = @Id_Employee;";

                        command.Parameters.AddWithValue("@Id_Employee", id);

                        command.CommandText = sql;

                        command.ExecuteNonQuery();

                        count = 1;
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

            return count;
        }

        public List<Employee> GetAll()
        {
            List<Employee> listEmployees = new List<Employee>();

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand())
                    {
                        command.Connection = connection;

                        string sql = @"SELECT Id_Employee, Name, Cpf, Birth, Phone FROM TBEmployee";

                        command.CommandText = sql;

                        SqlDataReader reader = command.ExecuteReader();

                        while (reader.Read())
                        {
                            Employee employeeSelected = new Employee();
                            employeeSelected.Id = int.Parse(reader["Id_Employee"].ToString().Trim());
                            employeeSelected.Name = reader["Name"].ToString().Trim();
                            employeeSelected.CPF = reader["Cpf"].ToString().Trim();
                            employeeSelected.Phone = reader["Phone"].ToString().Trim();
                            employeeSelected.Birth = DateTime.Parse(reader["Birth"].ToString().Trim());

                            listEmployees.Add(employeeSelected);
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

            return listEmployees;
        }

        public Employee GetById(int id)
        {
            var employeeSelected = new Employee();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;

                    string sql = @"SELECT Id_Employee, Name, Cpf, Birth, Phone FROM TBEmployee WHERE Id_Employee = @Id_Employee";

                    command.Parameters.AddWithValue("@Id_Employee", id);

                    command.CommandText = sql;

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        employeeSelected.Id = int.Parse(reader["Id_Employee"].ToString().Trim());
                        employeeSelected.Name = reader["Name"].ToString().Trim();
                        employeeSelected.CPF = reader["Cpf"].ToString().Trim();
                        employeeSelected.Phone = reader["Phone"].ToString().Trim();
                        employeeSelected.Birth = DateTime.Parse(reader["Birth"].ToString().Trim());
                    }
                }
            }

            return employeeSelected;
        }

        public List<Employee> GetByText(string text)
        {
            var listEmployees = new List<Employee>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;

                    string sql = String.Format(@"SELECT Id_Employee, Name, Cpf, Birth, Phone FROM TBEmployee WHERE NAME LIKE '%{0}%'", text);

                    command.CommandText = sql;

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Employee employeeSelected = new Employee();
                        employeeSelected.Id = int.Parse(reader["Id_Employee"].ToString());
                        employeeSelected.Name = reader["Name"].ToString();
                        employeeSelected.CPF = reader["Cpf"].ToString();
                        employeeSelected.Phone = reader["Phone"].ToString();
                        employeeSelected.Birth = DateTime.Parse(reader["Birth"].ToString());

                        listEmployees.Add(employeeSelected);
                    }
                }
            }

            return listEmployees;
        }

        public DataTable DataTable()
        {
            var listEmployees = new DataTable();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand())
                {
                    command.Connection = connection;

                    string sql = @"SELECT Id_Employee, Name, Cpf, Birth, Phone FROM TBEmployee";

                    command.CommandText = sql;

                    SqlDataReader leitor = command.ExecuteReader();

                    listEmployees.Load(leitor);
                }
            }

            return listEmployees;
        }

        public void ClearDataBase()
        {
            string sqlClear = String.Format(@"DELETE FROM [TBEmployee];
                                                 DBCC CHECKIDENT('[TBEmployee]', RESEED, 0);");

            SqlConnection connection = new SqlConnection(_connectionString);
            SqlCommand command = new SqlCommand(sqlClear, connection);
            command.CommandType = CommandType.Text;

            connection.Open();

            try
            {
                command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }
    }
}