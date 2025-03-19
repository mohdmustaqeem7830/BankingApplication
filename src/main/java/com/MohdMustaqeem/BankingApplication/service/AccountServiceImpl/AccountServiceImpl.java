package com.MohdMustaqeem.BankingApplication.service.AccountServiceImpl;

import com.MohdMustaqeem.BankingApplication.Mapper.AccountMapper;
import com.MohdMustaqeem.BankingApplication.dto.AccountDto;
import com.MohdMustaqeem.BankingApplication.entity.Account;
import com.MohdMustaqeem.BankingApplication.repository.AccountRepository;
import com.MohdMustaqeem.BankingApplication.service.AccountService;
import org.apache.catalina.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {


    AccountRepository   accountRepository ;

    public AccountServiceImpl(AccountRepository accountRepository) {
        super();
        this.accountRepository = accountRepository;
    }

    @Override
    public  AccountDto createAccount(AccountDto accountDto) {

        Account account = AccountMapper.maptoAccount(accountDto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.maptoAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account getaccount = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account not found"));
        return AccountMapper.maptoAccountDto(getaccount);
    }

    @Override
    public AccountDto deposit(Long id, Double amount) {

        Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account not found"));
        Double totalBalance = account.getBalance()+amount;
        account.setBalance(totalBalance);

        Account savedAccount = accountRepository.save(account);

        return AccountMapper.maptoAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, Double amount) {
        Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account not found"));
        Double currentBalance = account.getBalance();
        if(currentBalance<amount){
            throw new RuntimeException("Insufficient balance");
        }

        currentBalance = currentBalance-amount;
        account.setBalance(currentBalance);

        Account savedAccount = accountRepository.save(account);

        return AccountMapper.maptoAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAllAccounts() {

     return   accountRepository.findAll().stream().map((account -> AccountMapper.maptoAccountDto(account))).collect(Collectors.toList());

    }

    @Override
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account not found"));
        accountRepository.delete(account);
    }


}
