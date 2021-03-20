package com.app.weekdone.weekdonefrontend;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

@Controller
public class AboutController {
    
    @GetMapping("/about")
    public String getAbout(HttpServletRequest request, Model m){
        if (request.getParameter("who") != null){
            m.addAttribute("aboutinfo", request.getParameter("who"));
        }else{
            String aboutMsg = "hala fadin";
            m.addAttribute("aboutinfo", aboutMsg);            
        }
        return "about";
    }

}