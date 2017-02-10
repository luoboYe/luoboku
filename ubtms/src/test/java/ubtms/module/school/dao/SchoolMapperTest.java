package ubtms.module.school.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ubtms.basic.entity.LimitObjet;
import ubtms.module.school.entity.School;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by jinzhany on 2016/12/7.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SchoolMapperTest {
    @Resource
    private SchoolMapper schoolMapper;
    @Test
    public void queryById() throws Exception {
        System.out.println(schoolMapper.queryById(1));
    }

    @Test
    public void queryByName() throws Exception {
        System.out.println(schoolMapper.queryByName("�㶫��ҵ"));
    }

    @Test
    public void insertSchool() throws Exception {
        School school = new School();
        //school.setSchId(55);
        school.setSchName("地厅要");
        school.setSchLogo("safb.jpg");
        System.out.println(schoolMapper.insertSchool(school));
    }

    @Test
    public void selectWithLimit() throws Exception {
        //short a = 1;
        School school = new School();
        //school.setState(a);
        LimitObjet<School> limitObjet = new LimitObjet<>(school,0,10);
        System.out.println(schoolMapper.selectWithLimit(limitObjet));
    }

    @Test
    public void countSchool() throws Exception {

        System.out.println(schoolMapper.countSchool());
    }
}