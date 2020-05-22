package com.example.main.security;

import com.example.main.security.jwt.JwtSecurityConfigurer;
import com.example.main.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/bt/auth/signin").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/bt/auth/signin").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/cars/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/cars/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/addCar").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/addCar").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/cars").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/cars").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/masters/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/masters/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/addMaster").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/addMaster").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/masters" ).hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/masters" ).permitAll()
                .antMatchers(HttpMethod.GET, "/bt/services/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/services/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/addService").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/addService").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/services" ).hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/services" ).permitAll()
                .antMatchers(HttpMethod.GET, "/bt/works/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/works/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/addWork").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/addWork").permitAll()
                .antMatchers(HttpMethod.GET, "/bt/works" ).hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/works" ).permitAll()
                .antMatchers(HttpMethod.POST, "/bt/delete/works/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/delete/works/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/delete/masters/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/delete/masters/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/delete/services/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/delete/services/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/bt/delete/cars/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/bt/delete/cars/{id}").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));
    }

}
