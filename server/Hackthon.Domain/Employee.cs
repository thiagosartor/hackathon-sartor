using System;

namespace Hackthon.Domain
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CPF { get; set; }
        public DateTime Birth { get; set; }
        public string Phone { get; set; }

        public Employee()
        {
            Birth = new DateTime();
        }

        public override string ToString()
        {
            return String.Format("Id: {0} Nome: {1} CPF: {2} " +
                "Data Nascimento: {3} Telefone: {4}", Id, Name, CPF, Birth.ToShortDateString(), Phone);
        }
    }
}