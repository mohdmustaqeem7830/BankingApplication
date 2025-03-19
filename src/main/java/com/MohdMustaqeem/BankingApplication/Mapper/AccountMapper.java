package com.MohdMustaqeem.BankingApplication.Mapper;

import com.MohdMustaqeem.BankingApplication.dto.AccountDto;
import com.MohdMustaqeem.BankingApplication.entity.Account;

public class AccountMapper {

    public static Account maptoAccount(AccountDto accountDto){

        Account account = new Account(accountDto.getId(),accountDto.getAccountHolderName(),accountDto.getBalance());
        return account;
    }

    public static AccountDto maptoAccountDto(Account account){

        AccountDto accountDto = new AccountDto(account.getId(),account.getAccountHolderName(),account.getBalance());

        return accountDto;
    }
}
