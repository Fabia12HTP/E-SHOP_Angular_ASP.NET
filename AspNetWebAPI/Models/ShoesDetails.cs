﻿using System.ComponentModel.DataAnnotations;

public class ShoesDetails
{
    [Key]
    public float? ShoeSize { get; set; } //
    public string? ShoeColor { get; set; } // 
    public string? ShoeBrand { get; set; } //
    public string? ShoeMaterial { get; set; } //
}