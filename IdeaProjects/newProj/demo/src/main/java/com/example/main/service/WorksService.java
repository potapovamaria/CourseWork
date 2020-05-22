package com.example.main.service;

import com.example.main.entity.Work;
import com.example.main.entity.WorkDto;
import javassist.NotFoundException;

import javax.management.ServiceNotFoundException;
import java.util.List;

public interface WorksService {
    List<Work> listWorks();
    Work findWork(long id);
    Work addWork(WorkDto dto) throws ServiceNotFoundException, NotFoundException;
    void deleteWork(long id);
    void editWork(long id, WorkDto dto) throws ServiceNotFoundException, NotFoundException;
}
