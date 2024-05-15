<?php

namespace App\Dto;

class UserCreateDto
{
    public function __construct(
        public string $email,
        public string $password,
    ) {
    }
}