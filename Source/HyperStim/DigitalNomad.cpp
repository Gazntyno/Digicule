// Fill out your copyright notice in the Description page of Project Settings.


#include "DigitalNomad.h"

// Sets default values
ADigitalNomad::ADigitalNomad()
{
 	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(RootComponent);
	CameraBoom->TargetArmLength = 300.0f; // distance from the player
	CameraBoom->bUsePawnControlRotation = true; // Rotate the arm based on the controller 

	FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName);
	FollowCamera->bUsePawnControlRotation = false; // Camera doesn't rotate relative to arm

}

// Called when the game starts or when spawned
void ADigitalNomad::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void ADigitalNomad::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void ADigitalNomad::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

	PlayerInputComponent->BindAxis("MoveForward", this, &ADigitalNomad::MoveForward);
	PlayerInputComponent->BindAxis("MoveRight", this, &ADigitalNomad::MoveRight);

}

void ADigitalNomad::MoveForward(float Value) 
{
	if ((Controller != NULL) && (Value != 0.0f)) 
	{
		//Find out which way is forward
		const FRotator Rotation = Controller->GetControlRotation();
		const FVector Direction = FRotationMatrix(Rotation).GetScaledAxis(EAxis::X);
		AddMovementInput(Direction, Value);
	}
}

void ADigitalNomad::MoveRight(float Value)
{
	if ((Controller != NULL) && (Value != 0.0f))
	{
		//Find which way is right 
		const FRotator Rotation = Controller->GetControlRotation();
		const FVector Direction = FRotationMatrix(Rotation).GetScaledAxis(EAxis::Y);
		AddMovementInput(Direction, Value);
	}
}


