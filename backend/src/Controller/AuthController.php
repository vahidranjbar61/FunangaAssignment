<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AuthController extends AbstractController
{
    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): ?JsonResponse
    {
        if ($user === null) {
            return new JsonResponse([
                'statusCode' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Invalid credentials',
            ]);
        }

        return new JsonResponse([
            'username' => $user->getUserIdentifier(),
            'statusCode' => Response::HTTP_OK,
            'message' => 'You logged in'
        ]);
    }

     #[Route("/logout", name:"app_logout", methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse([
            'statusCode' => Response::HTTP_OK,
            'message' => 'You are logged out.',
        ]);
    }
}
