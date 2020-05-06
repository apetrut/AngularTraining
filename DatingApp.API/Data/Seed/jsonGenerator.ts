/* -------------------------------------- Products  ------------------------------------------------ */
[
    '{{repeat(5, 7)}}',
    {
      ProductName: '{{firstName()}}',
      ProductCode: '{{guid()}}',
      ReleaseDate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
      Price: '{{integer(0, 100)}}',
      StarRating: '{{integer(0, 5)}}',
      tags: [
        '{{repeat(7)}}',
        {
            Name: '{{lorem(1, "words")}}'
        }
      ],
      Photos: [
        {
          url: function(num){
            return 'assets/images/' + num.integer(1,99) + '.png';
        },
        isMain: true,
        description: '{{lorem()}}'
        }
      ]
    }
  ]


  /* -------------------------------------- Books  ------------------------------------------------ */