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

        public int BookId { get; set; }

        public string Topic { get; set; }

        public int MinPrice { get; set; } = 1;

        public int MaxPrice { get; set; } = 999;

        public string OrderBy { get; set; }
        
    }
}