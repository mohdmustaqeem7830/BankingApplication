package com.MohdMustaqeem.BankingApplication.service;

import com.MohdMustaqeem.BankingApplication.dto.AccountDto;
import com.MohdMustaqeem.BankingApplication.entity.Account;

import java.util.List;

public interface AccountService {

    AccountDto createAccount(AccountDto account);

    AccountDto getAccountById(Long id);

    AccountDto deposit(Long id, Double amount);

    AccountDto withdraw(Long id, Double amount);

    List<AccountDto> getAllAccounts();

    void deleteAccount(Long id);
}
