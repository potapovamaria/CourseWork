package com.example.main.service;

import com.example.main.entity.Master;

import java.util.List;

public interface MastersService {
    List<Master> listMasters();
    Master findMaster(long id);
    Master addMaster(Master master);
    void deleteMaster(long id);
    void editMaster(long id, String name);
}
