using AutoMapper;
using Rado.Dyntro.Server.Data.Entities;
using Rado.Dyntro.Server.Models;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserViewModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
            .ForMember(dest => dest.IsActivated, opt => opt.MapFrom(src => src.IsActivated));

        CreateMap<UserActivateViewModel, User>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.IsActivated, opt => opt.Ignore())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.FirstName, opt => opt.Ignore())
            .ForMember(dest => dest.LastName, opt => opt.Ignore())
            .ForMember(dest => dest.Role, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshTokenExpiryTime, opt => opt.Ignore())
            .ForMember(dest => dest.Orders, opt => opt.Ignore());

        CreateMap<UserViewModel, User>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
           .ForMember(dest => dest.IsActivated, opt => opt.Ignore())
           .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
           .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
           .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
           .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
           .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
           .ForMember(dest => dest.RefreshTokenExpiryTime, opt => opt.Ignore())
           .ForMember(dest => dest.Orders, opt => opt.Ignore());
    }


}
