using System.Collections.Generic;

namespace Hackthon.SQLServer
{
    public interface IDAO<T>
    {
        void AddOrUpdate(T entity);

        T GetById(int id);

        List<T> GetByText(string text);

        List<T> GetAll();

        int Delete(int id);
    }
}