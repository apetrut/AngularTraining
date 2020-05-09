namespace DatingApp.API.Helpers
{
    public class BookParams
    {
        private const int MaxPageSize = 25;

        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }
        
    }
}