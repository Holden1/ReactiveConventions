﻿using System;

namespace ConventionApi.Model
{
    public class Convention
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
    }
}