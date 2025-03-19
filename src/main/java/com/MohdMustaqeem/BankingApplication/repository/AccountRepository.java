package com.MohdMustaqeem.BankingApplication.repository;

import com.MohdMustaqeem.BankingApplication.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public  interface AccountRepository extends JpaRepository<Account, Long> {  //hibenate se table banayega table Account wali or id long type ki h

}
