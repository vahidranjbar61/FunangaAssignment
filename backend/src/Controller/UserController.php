<?php

namespace App\Controller;

use App\Dto\UserCreateDto;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function addUser(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $userDto = new UserCreateDto(
                email: $jsonData['email'],
                password: $jsonData['password'],
            );
            $this->userRepository->add($userDto, true);

            return new JsonResponse([
                'statusCode' => Response::HTTP_CREATED,
                'message' => 'User registered',
            ]);
        }

        return new JsonResponse([
            'statusCode' => Response::HTTP_BAD_REQUEST,
            'message' => 'Invalid credentials',
        ]);
    }
}