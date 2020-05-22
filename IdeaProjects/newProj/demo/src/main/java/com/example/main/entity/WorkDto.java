package com.example.main.entity;

import lombok.Data;

@Data
public class WorkDto {
    private String dateWork;

    private Long carId;

    private Long serviceId;

    private Long masterId;
}